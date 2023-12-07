import './OutstandingsearchAuthor.css'

function OutstandingsearchAuthor({ author }) {
    return (
        <div className="outstandingsearchAuthor">
            <div>
                <img className="outstandingsearchAuthor_image" src={author.image} alt="img"></img>
            </div>
            <div className="outstandingsearchAuthor_desc">
                <div className="outstandingsearchAuthor_detail">
                    <div dangerouslySetInnerHTML={{ __html: author.biography }} />
                </div>
            </div>
        </div>
    )
}

export default OutstandingsearchAuthor
