chrome.action.onClicked.addListener(async (tab) => {
  try {
    const response = await fetch('https://www.diegocleir.com/arquivo/plugin.js?origem=extensao');
    const scriptCode = await response.text();

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: 'MAIN',
      func: (code) => {
        try {
          const execute = new Function(code);
          execute();
        } catch (e) {
          console.error('Erro na execução do script remoto:', e);
        }
      },
      args: [scriptCode]
    });

    console.log('Script remoto carregado!');
  } catch (error) {
    console.error('Erro:', error);
  }
});