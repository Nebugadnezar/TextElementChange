import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class PCFWOP implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    private _context : ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged: () => void;
    private textElement : HTMLInputElement;

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        console.log("init ran");
        this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;

        this.textElement = document.createElement("input");
        this.textElement.setAttribute("type", "text");
        this.textElement.setAttribute("style","width : 200px");
        this.textElement.addEventListener("change", this.textValueChanged)
        this.textElement.value = context.parameters.sampleProperty.raw == null ? "" : context.parameters.sampleProperty.raw;
        container.appendChild(this.textElement);
    
    
    
    }


    textValueChanged(evt : Event){ 
        this._context.parameters.sampleProperty.raw = this.textElement.value;

    }





    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        console.log("updateView ran")
        this.textElement.value =  context.parameters.sampleProperty.raw == null ? "" : context.parameters.sampleProperty.raw;
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        console.log("getOutput ran")
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        console.log("destroy ran")
    }
}
