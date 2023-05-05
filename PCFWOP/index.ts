import { IInputs, IOutputs } from "./generated/ManifestTypes";
//import "./../FPCF/PCFAngularElement/node_modules/@angular/cdk/drag-drop";

export class MouseCoord implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private mainContainer: HTMLDivElement;
    private label: HTMLLabelElement;
    private button: HTMLButtonElement;
    private TxtBoxX: HTMLInputElement;
    private TxtBoxY: HTMLInputElement;
    private _notifyOutputChanged: () => void;
    private array: Number[];
    private OutputX: string;
    private OutputY: string;
    private _context: ComponentFramework.Context<IInputs>;
    private _textElement: HTMLInputElement;
    private _inputXValue?: string;
    private _inputYValue?: string;

    //private _notifyOutputChanged : string;

    constructor() {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        console.log('init ran');

        this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;

        this._textElement = document.createElement("input");
        this._textElement.setAttribute("type", "text");
        this._textElement.setAttribute("id", "TextID")
        this._textElement.setAttribute("style", "width : 200px");
        //this._textElement.value = context.parameters.sampleProperty.raw == null ? "" : context.parameters.sampleProperty.raw;

        this._textElement.addEventListener("change", this.onBlur);


        this.mainContainer = document.createElement("div");
        this.mainContainer.setAttribute("class", "maindiv")

        this.label = document.createElement("label");
        this.label.setAttribute("id", "LabelID")
        this.label.setAttribute("class", "Label")
        // this.button = document.createElement("button");
        // this.button.id = "cf6e3bc1-1cc1-4404-9171-9b7c981f97f6"
        // this.button.innerHTML = "Email me";
        // this.TxtBoxX = document.createElement("input");
        // this.TxtBoxX.setAttribute("placeholder","Value of X");
        // this.TxtBoxX.setAttribute("type", "text");
        // this.TxtBoxX.setAttribute("id", "XID");
        // this.TxtBoxY = document.createElement("input");
        // this.TxtBoxY.setAttribute("type", "text");
        // this.TxtBoxY.setAttribute("placeholder","Value of Y")

        //append children

        container.appendChild(this.label);
        container.appendChild(this._textElement);
        // container.appendChild(this.button);
        // container.appendChild(this.TxtBoxX);
        // container.appendChild(this.TxtBoxY);
        container.appendChild(this.mainContainer);


        //Event listeners
        this.mainContainer.addEventListener("click", this.ValChange)
        //this.button.addEventListener("click", this.SendEmail);            

    }

    public ValChange(event: MouseEvent): void {
        console.log('ValChange ran');
        const label = document.getElementById("LabelID");


        const text = document.getElementById("TextID");
        if (text) {
            console.log('you here if');
            text.setAttribute('value', String(event.clientX - 21) + ',' + String(event.clientY - 68));
            var event1 = new Event('change');
            text.dispatchEvent(event1)
        }

        if (label) {
            console.log('you here if');
            label.innerText = `{ "Coord" : { "posX": ${String(event.clientX - 21)} ,"posY":  ${String(event.clientY - 68)}} }`;
        }
        //this.OutputX = outputXVal;
        //this.array = [event.clientX - 21, event.clientY - 68];
        //this.SendEmail(this.array[0],this.array[1])
        //this._context.parameters.sampleProperty.raw = outputXVal;
        this._notifyOutputChanged;

    }

    /**
     * SendEmail
     */
    // public SendEmail() {

    //     const label = document.getElementById("LabelID");

    //     var Payload = label?.innerText;
    //     alert(Payload);
    //     var req = new XMLHttpRequest();
    //     var url = "https://prod-170.westeurope.logic.azure.com:443/workflows/5709899bbd0c4a058acce87dbf8608d2/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=U6ARP0iEYLuckPtOEBCe-7NdGMw3BKahyzyfmMA2-B4";
    //     req.open("POST", url, true);
    //     req.setRequestHeader("Content-Type", "application/json");
    //     req.send(Payload);
    // }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        console.log('updateView ran');
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        console.log('getOutputs ran');
        return {
            inputXValue: this._inputXValue,
            inputYValue: this._inputYValue
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

    public onBlur = (event: Event): void => {

        var splitted = this._textElement.value.split(",", 2);

        this._inputXValue = splitted[0];
        this._inputYValue = splitted[1];

        this._notifyOutputChanged();
    }
}
