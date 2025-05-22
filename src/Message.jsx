const Message = ({ message, photo, user }) => {
  console.log(photo);
  return (
    <div
      className="msgbox"
      style={{
        marginLeft: user ? "auto" : 0, // this aligns user messages to the right
        marginRight: user ? 0 : "auto",
      }}
    >
      {photo ? <img src={photo} /> : <Avatar src="/broken-image.jpg" />}
      <p>{message}</p>
    </div>
  );
};

export default Message;
