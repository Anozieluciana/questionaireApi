class thisError extends Error{
    constructor(message){
        super(message)
        this.name = this.constructor.message
    }
}


class ForbiddenError extends thisError {
    
    constructor(message) {
        super(`you are not the authorize to set ${message}`)
    }
}


class NotFoundError extends thisError{
    constructor(property, message="") {
        super(`${property} not found ${message}`)
    }
}

class unauthorizedError extends thisError {
    constructor(){
        super("You don't have right to this")
    }
}

class FieldRequiredError extends thisError{
    constructor(message){
        super(`${message} is required`)
    }
}
class ValidationError extends thisError{
    constructor(property, message){
        super(`${property} is not valid.. ${message}`)
    }
}

class AlreadyTakenError extends thisError{
    constructor(property, message=""){
        super(`${property} already exists.. ${message}`)
    }
}


module.exports={
    AlreadyTakenError,
    FieldRequiredError,
    unauthorizedError,
    NotFoundError,
    ForbiddenError,
    ValidationError,
    // DoesNotExist
}