function commit(){
    const token = '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';
    const owner = 'eirasmx';
    const repo = 'codebase';
    const filePath = '../util/data.json'; // File path to update
    const commitMessage = 'Update data.json';
    
    
    // Base64 encode the content
    const content = Buffer.from(JSON.stringify(session_data, null, 2)).toString('base64');
    
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: commitMessage,
        content: content,
        branch: 'main', // Specify the branch where the file is located
      }),
    })
    .then(response => {
      if (response.ok) {
        return true
      } else {
      console.log('upload not successful')
      return false
      }
    })
    .catch(error => {
        console.log('error')
        return false
    });    
}
