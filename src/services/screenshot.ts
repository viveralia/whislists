export async function getScreenshot(url: string) {
  try {
    const token = process.env.REACT_APP_SCREENSHOT_API_TOKEN;
    const apiUrl = `https://screenshotapi.net/api/v1/screenshot?url=${url}&token=&${token}`;
    const response = await fetch(apiUrl);
    const { screenshot } = await response.json();
    return screenshot;
  } catch (error) {
    throw Error(error);
  }
}
