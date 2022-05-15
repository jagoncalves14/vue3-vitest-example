import { expect } from 'vitest'
import jestSerializer from 'jest-serializer-vue'

// Add Snapshot Serializer
expect.addSnapshotSerializer(jestSerializer)
