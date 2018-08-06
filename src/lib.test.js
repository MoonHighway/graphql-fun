import { loadAllAudio } from './lib'

describe("lib", () => {
    it('exports a loadAllAudio function', () => {
        expect(loadAllAudio).toBeDefined()
    })
})