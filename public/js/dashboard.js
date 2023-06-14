document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-button');
  
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
  
        // Retrieve the post ID from the data attribute
        const postId = button.dataset.postId;
  
        // Confirm the deletion
        if (confirm('Are you sure you want to delete this post?')) {
          const url = `/posts/${postId}`;
  
          try {
            const response = await fetch(url, { method: 'DELETE' });
  
            if (response.ok) {
              // Refresh the page after successful deletion
              location.reload();
            } else {
              throw new Error('Error deleting post');
            }
          } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the post');
          }
        }
      });
    });
  });
  