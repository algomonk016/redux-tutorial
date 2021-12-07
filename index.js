const BUY_CAKE = 'BUY_CAKE'

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First Redux Action'
    }
}


/*
    action creater:
        - a function that returns action
    
    action:
        - plain js object
        - having a type property
        - only way our application can interact with the store
        - carry some information from our app to redux store
*/ 
