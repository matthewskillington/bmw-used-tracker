const webhookUrl = "https://discord.com/api/webhooks/1196172460127686666/1JyrHZnCYx8asVL8T-NsoWvjYSH9asOrJcfQc7WP7bQv9WL7IJ-xiMZXdk3Xl7F40Ail";

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
