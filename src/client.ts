import './style/app.css';
import { MsePlayer } from './player/MsePlayer';
import { StreamClientScrcpy } from './googDevice/client/StreamClientScrcpy';
import Device from './device';
// import { HostTracker } from './client/HostTracker';
// import { StreamClientQVHack } from './applDevice/client/StreamClientQVHack';
// import { Tool } from './googDevice/client/Tool';

window.onload = async function(): Promise<void> {
    // const hash = location.hash.replace(/^#!/, '');
    // const parsedQuery = querystring.parse(hash);
    // const action = parsedQuery.action;

    const device = new Device('FA69R0312694', 'ws://127.0.0.1:8886');
    device.clientRun();
    const deviceElement = device.getDeviceElement();
    document.body.append(deviceElement);
    return;

    /// #if USE_BROADWAY
    // const { BroadwayPlayer } = await import('./player/BroadwayPlayer');
    // StreamClientScrcpy.registerPlayer(BroadwayPlayer);
    /// #endif

    /// #if USE_H264_CONVERTER
    const parsedQuery = {
        action: 'stream',
        udid: 'FA69R0312694',
        player: 'mse',
        // ws: 'ws://127.0.0.1:8886/?action=proxy-adb&remote=tcp:8886&udid=FA69R0312694',
        ws: 'ws://127.0.0.1:8886',
    };
    StreamClientScrcpy.registerPlayer(MsePlayer);
    const streamClientScrcpy = StreamClientScrcpy.clientInit(parsedQuery);
    streamClientScrcpy.attachTouchListeners();
    const deviceView = streamClientScrcpy.getDeviceView();
    document.body.append(deviceView);
    /// #endif

    /// #if USE_TINY_H264
    // const { TinyH264Player } = await import('./player/TinyH264Player');
    // StreamClientScrcpy.registerPlayer(TinyH264Player);
    /// #endif

    // if (action === StreamClientScrcpy.ACTION && typeof parsedQuery.udid === 'string') {
    //     StreamClientScrcpy.start(parsedQuery);
    //     return;
    // }
    // if (action === StreamClientQVHack.ACTION && typeof parsedQuery.udid === 'string') {
    //     StreamClientQVHack.start(parsedQuery);
    //     return;
    // }
    //
    // const tools: Tool[] = [];
    //
    // / #if INCLUDE_ADB_SHELL
    // const { ShellClient } = await import('./googDevice/client/ShellClient');
    // if (action === ShellClient.ACTION && typeof parsedQuery.udid === 'string') {
    //     ShellClient.start(parsedQuery);
    //     return;
    // }
    // tools.push(ShellClient);
    // / #endif
    //
    // / #if INCLUDE_DEV_TOOLS
    // const { DevtoolsClient } = await import('./googDevice/client/DevtoolsClient');
    // if (action === DevtoolsClient.ACTION) {
    //     DevtoolsClient.start(parsedQuery);
    //     return;
    // }
    // tools.push(DevtoolsClient);
    // / #endif
    //
    // if (tools.length) {
    //     const { DeviceTracker } = await import('./googDevice/client/DeviceTracker');
    //     tools.forEach((tool) => {
    //         DeviceTracker.registerTool(tool);
    //     });
    // }
    // HostTracker.start();
};
