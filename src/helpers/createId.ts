import { customAlphabet } from "nanoid"

const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"

export function createId() {
    const id = customAlphabet(alphabet, 8)
    
    return id()
}