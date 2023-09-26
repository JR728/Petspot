async function postFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const postContent = document.querySelector('#post-content').value.trim();

    const response = await fetch('/api/posts/create', {
      method: 'POST',
      body: JSON.stringify({
        title,
        postContent
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', postFormHandler);