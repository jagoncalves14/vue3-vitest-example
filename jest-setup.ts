// Mock window.IntersectionObserver
const IntersectionObserverMock = jest.fn(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  takeRecords: jest.fn(),
  unobserve: jest.fn(),
}))

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
})
