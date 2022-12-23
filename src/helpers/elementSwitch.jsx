export const elementSwitch=(type,pathToFile,text)=>{
    switch (`${type}`) {
        case 'text':{
        return (
            <>
            <p>{text}</p>
            </>)}
        case 'image':{
            return <img src={pathToFile} alt=''/>}
        case 'audio':{
        return <audio src={pathToFile} controls></audio>}
        case 'video':{
        return <video src={pathToFile} controls></video>}
        default:
        return null
    }
}