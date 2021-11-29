import "./message.css";
import TimeAgo from 'react-timeago'
import russianStrings from 'react-timeago/lib/language-strings/ru'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(russianStrings)

export default function Message({ message, own }) {

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={message.senderProfilePicture}
          alt=""
        />
        <p className="messageText">{message.text} </p>
      </div>
      {/* <div className="messageBottom">{format(message.createdAt)}</div> */}
      <TimeAgo date={message.createdAt} formatter={formatter}/>
    </div>
  );
}