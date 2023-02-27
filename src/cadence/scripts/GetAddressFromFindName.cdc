import FIND from 0x097bafa4e0b48eef

pub fun main(findName: String) : Address? {
    let resolveAddress: Address? = FIND.resolve(findName) 
    return resolveAddress
}