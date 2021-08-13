const parameters = require("./parameters")
// @ponicode
describe("parameters", () => {
    test("0", () => {
        let callFunction = () => {
            parameters({ paths: { key2: 100, 1: { 6: { parameters: { key4: "1.2.3.4" } } }, 6: { key1: -100, 2: { parameters: { key4: "1.2.3.4" } } }, 7: { 3: { parameters: { key4: "150.151.152.153" } }, 6: { parameters: { key4: "1.2.3.4" } } } }, parameters: { key3: -5.48, 1: { name: "array" }, 7: { name: "string" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            parameters({ paths: { key2: 100, 1: { 6: { parameters: { key4: "1.2.3.4" } } }, 6: { key1: -100, 2: { parameters: { key4: "1.2.3.4" } } }, 7: { 3: { parameters: { key4: "150.151.152.153" } }, 6: { parameters: { key4: "192.168.99.101" } } } }, parameters: { key3: -100, 1: { name: "array" }, 7: { name: "array" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            parameters({ paths: { key2: 100, 1: { 6: { parameters: { key4: "150.151.152.153" } } }, 6: { key1: -5.48, 2: { parameters: { key4: "1.2.3.4" } } }, 7: { 3: { parameters: { key4: "1.2.3.4" } }, 6: { parameters: { key4: "150.151.152.153" } } } }, parameters: { key3: 100, 1: { name: "object" }, 7: { name: "object" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            parameters({ paths: { key2: 0, 1: { 6: { parameters: { key4: "150.151.152.153" } } }, 6: { key1: 100, 2: { parameters: { key4: "1.2.3.4" } } }, 7: { 3: { parameters: { key4: "1.2.3.4" } }, 6: { parameters: { key4: "1.2.3.4" } } } }, parameters: { key3: -5.48, 1: { name: "number" }, 7: { name: "number" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            parameters({ paths: { key2: -100, 1: { 6: { parameters: { key4: "1.2.3.4" } } }, 6: { key1: 1, 2: { parameters: { key4: "1.2.3.4" } } }, 7: { 3: { parameters: { key4: "192.168.99.101" } }, 6: { parameters: { key4: "192.168.99.101" } } } }, parameters: { key3: 0, 1: { name: "object" }, 7: { name: "object" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            parameters({ paths: {}, parameters: { key3: -Infinity, 1: {}, 7: {} } })
        }
    
        expect(callFunction).not.toThrow()
    })
})
