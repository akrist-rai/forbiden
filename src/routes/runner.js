const Router = require('@koa/router');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const router = new Router({ prefix: '/api/run' });

router.post('/', async (ctx) => {
  const { code, language } = ctx.request.body;
  const tmpDir = path.join(__dirname, '../../tmp');
  await fs.mkdir(tmpDir, { recursive: true });

  try {
    if (language === 'cpp') {
      const filePath = path.join(tmpDir, 'main.cpp');
      const outPath = path.join(tmpDir, 'a.out');
      await fs.writeFile(filePath, code);
      
      const output = await executeCommand(`g++ ${filePath} -o ${outPath} && ${outPath}`);
      ctx.body = { success: true, output };
    } 
    else if (language === 'python') {
      const filePath = path.join(tmpDir, 'script.py');
      await fs.writeFile(filePath, code);
      
      const output = await executeCommand(`python3 ${filePath}`);
      ctx.body = { success: true, output };
    } 
    else {
      ctx.status = 400;
      ctx.body = { error: 'Unsupported language' };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { success: false, output: err.message };
  }
});

function executeCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(new Error(stderr || stdout || error.message));
      else resolve(stdout);
    });
  });
}

module.exports = router;