const Notification = ({ statusMessage }) => {
    console.log(`Notifaction component`);
    console.log(statusMessage);
    if (statusMessage === null) {
        return null;
    }

    const statusStyle = {
        color: statusMessage.isSuccess ? `green` : `red`,
    };

    return (
        <div className={`notification`} style={statusStyle}>
            {statusMessage.message}
        </div>
    );
};

export default Notification;
