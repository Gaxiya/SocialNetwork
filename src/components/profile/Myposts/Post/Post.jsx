import clasess from'./Post.module.css';
function Post (props) {
    
    return(<div className={clasess.post}>
        <div className={clasess.circle}></div>
        <div className={`${clasess.item}`}>{`${props.text}`}</div>
        </div>
    )
}
export default Post