import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import { createDevTools } from 'redux-devtools';

export default createDevTools(
  <DockMonitor
    changePositionKey="ctrl-w"
    defaultIsVisible={false}
    toggleVisibilityKey="ctrl-h"
  >
    <LogMonitor />
  </DockMonitor>
);
