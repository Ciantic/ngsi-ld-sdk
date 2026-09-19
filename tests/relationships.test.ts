import { describe, it, expect, beforeEach } from "vitest";
import {
  createEntity,
  retrieveEntity,
  queryEntity,
  updateEntity,
} from "../src/operations";
import { NgsiLdBadRequest } from "../src/errors";
import { NGSILD_CORE_CONTEXT } from "../src";
import type * as schemas from "../src/schemas";
import { cleanUpAll, gateBroker } from "./helpers";

// NGSI-LD treats Relationships as opaque references: the broker stores and
// returns the target IRI (`object`) without dereferencing it. There is no
// special handling for any relationship name such as "hasPart" — attribute
// names are just JSON-LD terms (expanded to `<default-context>/hasPart` when
// not defined in the context). The target is only resolved on demand via
// Linked Entity Retrieval (`join=inline` / `join=flat`), which adds the
// read-only `entity` member to the Relationship node.
//
// `objectType` is optional in the spec and is deliberately not used in the
// common cases below: Stellio does not implement it and rejects the whole
// entity with 400 (see the gated test at the bottom).

beforeEach(cleanUpAll);

interface TargetEntity extends schemas.Entity {
  type: "TestEntity";
  temperature?: schemas.Property<number>;
}

interface SourceEntity extends schemas.Entity {
  type: "TestEntity";
  locatedAt?: schemas.Relationship<TargetEntity>;
  hasPart?: schemas.Relationship<TargetEntity>;
}

let relCounter = 0;

function makeIds() {
  relCounter += 1;
  const suffix = `${Date.now()}-${relCounter}`;
  return {
    sourceId: `urn:ngsi-ld:TestEntity:rel-src-${suffix}`,
    targetId: `urn:ngsi-ld:TestEntity:rel-tgt-${suffix}`,
    otherTargetId: `urn:ngsi-ld:TestEntity:rel-other-${suffix}`,
  };
}

async function createTarget(id: string, value = 42) {
  await createEntity({
    entity: {
      "@context": NGSILD_CORE_CONTEXT,
      id,
      type: "TestEntity",
      temperature: { type: "Property", value },
    },
  });
}

function nestedEntity(
  entity: schemas.Relationship<TargetEntity>["entity"],
): TargetEntity | undefined {
  if (Array.isArray(entity)) return entity[0];
  return entity;
}

// ---------------------------------------------------------------------------
// 1. Storing and returning a Relationship
// ---------------------------------------------------------------------------
describe("Relationship storage", () => {
  it("should return the target IRI as object without dereferencing it", async () => {
    const { sourceId, targetId } = makeIds();
    await createTarget(targetId);

    await createEntity({
      entity: {
        "@context": NGSILD_CORE_CONTEXT,
        id: sourceId,
        type: "TestEntity",
        locatedAt: {
          type: "Relationship",
          object: targetId,
        },
      },
    });

    const entity = await retrieveEntity<SourceEntity>({ entityId: sourceId });

    expect(entity.locatedAt?.type).toBe("Relationship");
    expect(entity.locatedAt?.object).toBe(targetId);
    // No dereferencing unless join is explicitly requested.
    expect(entity.locatedAt?.entity).toBeUndefined();
  });

  it("should treat hasPart as an ordinary Relationship with no special semantics", async () => {
    const { sourceId, targetId } = makeIds();
    await createTarget(targetId);

    await createEntity({
      entity: {
        "@context": NGSILD_CORE_CONTEXT,
        id: sourceId,
        type: "TestEntity",
        hasPart: {
          type: "Relationship",
          object: targetId,
        },
      },
    });

    const entity = await retrieveEntity<SourceEntity>({ entityId: sourceId });

    expect(entity.hasPart?.type).toBe("Relationship");
    expect(entity.hasPart?.object).toBe(targetId);
  });

  it("should support a multi-target Relationship (object array)", async () => {
    const { sourceId, targetId, otherTargetId } = makeIds();
    await createTarget(targetId);
    await createTarget(otherTargetId);

    await createEntity({
      entity: {
        "@context": NGSILD_CORE_CONTEXT,
        id: sourceId,
        type: "TestEntity",
        hasPart: {
          type: "Relationship",
          object: [targetId, otherTargetId],
        },
      },
    });

    const entity = await retrieveEntity<SourceEntity>({ entityId: sourceId });
    const objects = Array.isArray(entity.hasPart?.object)
      ? entity.hasPart?.object
      : [entity.hasPart?.object];

    expect(new Set(objects)).toEqual(new Set([targetId, otherTargetId]));
  });
});

// ---------------------------------------------------------------------------
// 2. Linked Entity Retrieval (dereferencing)
// ---------------------------------------------------------------------------
describe("Linked Entity Retrieval", () => {
  it("should inline the linked entity when join=inline is requested", async () => {
    const { sourceId, targetId } = makeIds();
    await createTarget(targetId, 7);

    await createEntity({
      entity: {
        "@context": NGSILD_CORE_CONTEXT,
        id: sourceId,
        type: "TestEntity",
        locatedAt: {
          type: "Relationship",
          object: targetId,
        },
      },
    });

    // `local=true` is required by Scorpio to perform linked-entity retrieval;
    // without it Scorpio returns the bare IRI. Both entities are local, so this
    // does not change the intent on Stellio or Orion-LD (which dereference
    // without it).
    const entity = await retrieveEntity<SourceEntity>({
      entityId: sourceId,
      params: {
        join: "inline",
        joinLevel: 1,
        local: true,
      },
    });

    const linked = nestedEntity(entity.locatedAt?.entity);

    expect(linked?.id).toBe(targetId);
    expect(linked?.temperature?.value).toBe(7);
  });
});

// ---------------------------------------------------------------------------
// 3. Querying by relationship
// ---------------------------------------------------------------------------
describe("Relationship filtering", () => {
  it("should filter entities by Relationship object using the q parameter", async () => {
    const { sourceId, targetId, otherTargetId } = makeIds();
    await createTarget(targetId);
    await createTarget(otherTargetId);

    await createEntity({
      entity: {
        "@context": NGSILD_CORE_CONTEXT,
        id: sourceId,
        type: "TestEntity",
        locatedAt: {
          type: "Relationship",
          object: targetId,
        },
      },
    });

    const matches = await queryEntity<SourceEntity>({
      params: {
        type: "TestEntity",
        q: `locatedAt=="${targetId}"`,
      },
    });
    expect(matches.some((e) => e.id === sourceId)).toBe(true);

    const misses = await queryEntity<SourceEntity>({
      params: {
        type: "TestEntity",
        q: `locatedAt=="${otherTargetId}"`,
      },
    });
    expect(misses.some((e) => e.id === sourceId)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 4. Updating a Relationship
// ---------------------------------------------------------------------------
describe("Relationship update", () => {
  it("should replace the Relationship object via entity update", async () => {
    const { sourceId, targetId, otherTargetId } = makeIds();
    await createTarget(targetId);
    await createTarget(otherTargetId);

    await createEntity({
      entity: {
        "@context": NGSILD_CORE_CONTEXT,
        id: sourceId,
        type: "TestEntity",
        locatedAt: {
          type: "Relationship",
          object: targetId,
        },
      },
    });

    await updateEntity<SourceEntity>({
      entityId: sourceId,
      entityFragment: {
        "@context": NGSILD_CORE_CONTEXT,
        locatedAt: {
          type: "Relationship",
          object: otherTargetId,
        },
      },
    });

    const entity = await retrieveEntity<SourceEntity>({ entityId: sourceId });
    expect(entity.locatedAt?.object).toBe(otherTargetId);
  });
});

// ---------------------------------------------------------------------------
// 5. objectType (optional, broker-dependent)
// ---------------------------------------------------------------------------
// Spec §5.2.6 defines `objectType` as an optional advisory type for the target.
// Stellio does not implement it: the expanded term `hasObjectType` falls
// through to the generic sub-attribute parser, which rejects it with 400
// ("has an invalid or not implemented type: null"). Orion-LD supports it.
describe("Relationship objectType", () => {
  it("should accept objectType on a Relationship", async () => {
    const { sourceId, targetId } = makeIds();
    await createTarget(targetId);

    const entity = {
      "@context": NGSILD_CORE_CONTEXT,
      id: sourceId,
      type: "TestEntity",
      locatedAt: {
        type: "Relationship",
        object: targetId,
        objectType: "TestEntity",
      },
    } as const;

    try {
      const response = await createEntity({ entity });
      expect(response.status).toBe(201);
    } catch (err) {
      if (
        gateBroker("stellio", "objectType not implemented on Relationships")
      ) {
        expect(err).toBeInstanceOf(NgsiLdBadRequest);
        return;
      }
      throw err;
    }
  });
});
