import { StreamClientScrcpy } from './googDevice/client/StreamClientScrcpy';
import { MsePlayer } from './player/MsePlayer';
import { TouchHandlerListener } from './touchHandler/FeaturedTouchHandler';
import VideoSettings from './VideoSettings';

export default class Device {
    private streamClient: StreamClientScrcpy;

    constructor(serial: string, ws: string) {
        const parsedQuery = {
            action: 'stream',
            udid: serial,
            player: 'mse',
            ws: ws,
        };
        StreamClientScrcpy.registerPlayer(MsePlayer);
        this.streamClient = StreamClientScrcpy.clientInit(parsedQuery);
    }

    public setTouchListener(): void {
        this.streamClient.attachTouchListeners();
    }

    public addMultipleListeners(...listener: TouchHandlerListener[]): void {
        this.streamClient.attachMultipleTouchListeners(...listener);
    }

    public clientRun(fitToScreen?: boolean, videoSettings?: VideoSettings) {
        this.streamClient.fetchSteam(fitToScreen, videoSettings);
    }

    public getDeviceElement(): HTMLDivElement {
        return this.streamClient.getDeviceView();
    }
}


