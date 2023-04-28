import { testClient } from '../../tests/addTestContracts'
import getExpiry from './getExpiry'

describe('getExpiry', () => {
  it('should get the expiry for a .eth name with no other args', async () => {
    const result = await getExpiry(testClient, { name: 'with-profile.eth' })
    expect(result).toBeTruthy()
    if (result) {
      const { expiry, gracePeriod, status } = result
      expect(expiry.date).toBeInstanceOf(Date)
      expect(typeof expiry.value).toBe('bigint')
      expect(gracePeriod).toBe(7776000)
      expect(status).toBe('active')
    }
  })
  it('should get the expiry for a wrapped name', async () => {
    const result = await getExpiry(testClient, {
      name: 'wrapped.eth',
      contract: 'nameWrapper',
    })

    expect(result).toBeTruthy()
    if (result) {
      const { expiry, gracePeriod, status } = result
      expect(expiry.date).toBeInstanceOf(Date)
      expect(typeof expiry.value).toBe('bigint')
      expect(gracePeriod).toBe(0)
      expect(status).toBe('active')
    }
  })
  it('should return null for a non .eth name if not wrapped', async () => {
    const result = await getExpiry(testClient, { name: 'sub.with-profile.eth' })
    expect(result).toBeNull()
  })
  it('should throw an error for a non .eth name if registrar is specified', async () => {
    try {
      await getExpiry(testClient, {
        name: 'sub.with-profile.eth',
        contract: 'registrar',
      })
      expect(false).toBeTruthy()
    } catch {
      expect(true).toBeTruthy()
    }
  })
})
