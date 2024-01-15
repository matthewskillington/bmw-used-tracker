const webhookUrl = "https://discord.com/api/webhooks/1196172434726993990/HLTiuvLjSOPjDrmXRv1U6_dCQJk0DGI5TaG3B4DeFK_nBhpgYNu6yYLTkwRA_AObXcM2";

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
