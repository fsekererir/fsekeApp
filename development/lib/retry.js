async function retry({ retries, delay = 0, rejectionMessage = 'Retry limit reached', stopAfterOneFailure = false }, fn) {
  let attempts = 0;
  
  while (attempts <= retries) {
    if (attempts > 0 && delay > 0) await new Promise(r => setTimeout(r, delay));
    
    try {
      const result = await fn();
      return result;
    } catch (error) {
      console.error(error.message === "Exited with code '1'" ? `retry() received: ${error.message}` : `error caught in retry(): ${JSON.stringify(error)}\n`);
      
      if (stopAfterOneFailure || attempts >= retries)
        return null;

      console.log('Ready to retry() again');
    }
    
    attempts++;
  }

  throw new Error(rejectionMessage);
}
```
```python
