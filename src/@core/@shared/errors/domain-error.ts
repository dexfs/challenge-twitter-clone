export default class DomainError extends Error {
    constructor(message?: string) {
        super(message || "Domain error ocurred");
        this.name = 'DomainError'
    }
}