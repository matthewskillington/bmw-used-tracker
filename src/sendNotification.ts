const webhookUrl = "";

export const sendNotification = (payload: string) => {
    const data = { content: payload }

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (!response.ok) {
          console.log(`Could not send message: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
}
