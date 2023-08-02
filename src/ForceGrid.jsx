const forceGrid = (props) => {

    console.log(props)

    const cells = []

    for(let i=0; i<7; i++){
        if(props.force === i){
            cells.push(<div className='forceCell' key={i}><div id='forceCube' ></div></div>)
        } else {
            cells.push(<div className='forceCell' key={i}></div>)
        }
    }
    return (
        cells
    )
}

export default forceGrid