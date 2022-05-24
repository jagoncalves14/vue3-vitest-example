// Mock IntersectionObserver
const IntersectionObserverMock = jest.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

jest.stubGlobal('IntersectionObserver', IntersectionObserverMock)
