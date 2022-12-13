import {afterEach, beforeEach, describe, expect, it} from '@jest/globals'
import {generateVersionPrefix, matchVersionPattern} from './utils'
import * as sinon from 'sinon'

describe('matchVersionPattern', () => {
  describe('with valid calver', () => {
    it('matches to valid calver with one-digit month', () => {
      expect(matchVersionPattern('2022.1.10.1')).toBe(true)
    })
    it('matches to valid calver with one-digit day', () => {
      expect(matchVersionPattern('2022.10.1.1')).toBe(true)
    })
    it('matches to valid calver with two-digits month', () => {
      expect(matchVersionPattern('2022.10.1.1')).toBe(true)
    })
    it('matches to valid calver with two-digits day', () => {
      expect(matchVersionPattern('2022.1.10.1')).toBe(true)
    })
    it('matches to valid calver with five-digits modifier', () => {
      expect(matchVersionPattern('2022.12.13.10000')).toBe(true)
    })
  })
  describe('with invallid calver', () => {
    it('does not match to calver without modifier', () => {
      expect(matchVersionPattern('2022.12.13')).toBe(false)
    })
  })
})

describe('generateVersionPrefix', () => {
  let clock: sinon.SinonFakeTimers
  beforeEach(() => {
    clock = sinon.useFakeTimers({
      now: 1483228800000 // January 1st 2017
    })
  })
  afterEach(function () {
    clock.restore()
  })
  it('generates YYYY.MM.DD', () => {
    expect(generateVersionPrefix()).toBe('2017.01.01')
  })
})
