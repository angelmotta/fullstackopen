const Notification = ({ statusMessage }) => {
    console.log(statusMessage);
    if (statusMessage === null) {
        return null;
    }

    const classNameMessage = statusMessage.isSuccess
        ? "successNotification"
        : "errorNotification";
    console.log(`className chosen: ${classNameMessage}`);

    return <div className={classNameMessage}>{statusMessage.message}</div>;
};

export default Notification;
