const HideChildren = ({status, children}) => {
    if(status){
        return null
    }

    return children
}

export default HideChildren;