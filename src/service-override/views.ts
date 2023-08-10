import '../missing-services'
import { IEditorOverrideServices, StandaloneServices } from 'vs/editor/standalone/browser/standaloneServices'
import { SyncDescriptor } from 'vs/platform/instantiation/common/descriptors'
import { IViewContainersRegistry, IViewDescriptor, IViewDescriptorService, IViewsRegistry, IViewsService, ViewContainerLocation, Extensions as ViewExtensions } from 'vs/workbench/common/views'
import { ViewsService } from 'vs/workbench/browser/parts/views/viewsService'
import { IInstantiationService, ServicesAccessor } from 'vs/platform/instantiation/common/instantiation'
import { SidebarPart } from 'vs/workbench/browser/parts/sidebar/sidebarPart'
import { ViewDescriptorService } from 'vs/workbench/services/views/browser/viewDescriptorService'
import { IActivityService, IBadge } from 'vs/workbench/services/activity/common/activity'
import { ActivityService } from 'vs/workbench/services/activity/browser/activityService'
import { IPaneCompositePartService } from 'vs/workbench/services/panecomposite/browser/panecomposite'
import { Event } from 'vs/base/common/event'
import { IPaneComposite } from 'vs/workbench/common/panecomposite'
import { IPaneCompositePart, IPaneCompositeSelectorPart } from 'vs/workbench/browser/parts/paneCompositePart'
import { ActivitybarPart } from 'vs/workbench/browser/parts/activitybar/activitybarPart'
import { DisposableStore, IDisposable, IReference } from 'vs/base/common/lifecycle'
import { IProgressIndicator } from 'vs/platform/progress/common/progress'
import { IHoverService } from 'vs/workbench/services/hover/browser/hover'
import { HoverService } from 'vs/workbench/services/hover/browser/hoverService'
import { ExplorerService } from 'vs/workbench/contrib/files/browser/explorerService'
import { IExplorerService } from 'vs/workbench/contrib/files/browser/files'
import { PanelPart } from 'vs/workbench/browser/parts/panel/panelPart'
import { append, $, Dimension } from 'vs/base/browser/dom'
import { ViewPane } from 'vs/workbench/browser/parts/views/viewPane'
import { Registry } from 'vs/platform/registry/common/platform'
import { ViewPaneContainer } from 'vs/workbench/browser/parts/views/viewPaneContainer'
import { URI } from 'vs/base/common/uri'
import { Part } from 'vs/workbench/browser/part'
import { EditorPart } from 'vs/workbench/browser/parts/editor/editorPart'
import 'vs/workbench/contrib/files/browser/fileCommands'
import 'vs/workbench/contrib/files/browser/fileActions.contribution'
import 'vs/workbench/contrib/callHierarchy/browser/callHierarchy.contribution'
import 'vs/workbench/contrib/typeHierarchy/browser/typeHierarchy.contribution'
import 'vs/workbench/contrib/codeEditor/browser/outline/documentSymbolsOutline'
import 'vs/workbench/contrib/outline/browser/outline.contribution'
import 'vs/workbench/browser/actions/listCommands'
import 'vscode/vs/workbench/browser/parts/views/media/views.css'
import 'vs/workbench/api/browser/viewsExtensionPoint'
import 'vs/workbench/browser/parts/editor/editor.contribution'
import 'vs/workbench/browser/workbench.contribution'
import 'vs/workbench/contrib/customEditor/browser/customEditor.contribution'
import 'vs/workbench/contrib/webviewPanel/browser/webviewPanel.contribution'
import 'vs/workbench/contrib/externalUriOpener/common/externalUriOpener.contribution'
import 'vs/workbench/contrib/languageStatus/browser/languageStatus.contribution'
import 'vs/workbench/contrib/languageDetection/browser/languageDetection.contribution'
// import to 2 times with filter to not duplicate the import from files.ts
import 'vs/workbench/contrib/files/browser/files.contribution.js?include=registerConfiguration'
import 'vs/workbench/contrib/files/browser/files.contribution.js?exclude=registerConfiguration'
import { Codicon } from 'vs/base/common/codicons'
import { IEditorGroupsService } from 'vs/workbench/services/editor/common/editorGroupsService'
import { IEditorDropService } from 'vs/workbench/services/editor/browser/editorDropService'
import { EditorService } from 'vs/workbench/services/editor/browser/editorService'
import { IEditorDropTargetDelegate } from 'vs/workbench/browser/parts/editor/editorDropTarget'
import { IEditorService, PreferredGroup } from 'vs/workbench/services/editor/common/editorService'
import { IEditorResolverService } from 'vs/workbench/services/editor/common/editorResolverService'
import { EditorResolverService } from 'vs/workbench/services/editor/browser/editorResolverService'
import { BreadcrumbsService, IBreadcrumbsService } from 'vs/workbench/browser/parts/editor/breadcrumbs'
import { IContextViewService } from 'vs/platform/contextview/browser/contextView'
import { ContextViewService } from 'vs/platform/contextview/browser/contextViewService'
import { ICodeEditorService } from 'vs/editor/browser/services/codeEditorService'
import { EditorInput, IEditorCloseHandler } from 'vs/workbench/common/editor/editorInput'
import { EditorExtensions, IEditorPane, IResourceDiffEditorInput, ITextDiffEditorPane, IUntitledTextResourceEditorInput, IUntypedEditorInput, Verbosity } from 'vs/workbench/common/editor'
import { IEditorOptions, IResourceEditorInput, ITextResourceEditorInput } from 'vs/platform/editor/common/editor'
import { ITextModelService, IResolvedTextEditorModel } from 'vs/editor/common/services/resolverService'
import { IFileService } from 'vs/platform/files/common/files'
import { IConfigurationService } from 'vs/platform/configuration/common/configuration'
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace'
import { IUriIdentityService } from 'vs/platform/uriIdentity/common/uriIdentity'
import { IWorkspaceTrustRequestService } from 'vs/platform/workspace/common/workspaceTrust'
import { IHostService } from 'vs/workbench/services/host/browser/host'
import { ITextEditorService, TextEditorService } from 'vs/workbench/services/textfile/common/textEditorService'
import { CodeEditorService } from 'vs/workbench/services/editor/browser/codeEditorService'
import { IUntitledTextEditorService, UntitledTextEditorService } from 'vs/workbench/services/untitled/common/untitledTextEditorService'
import { StatusbarPart } from 'vs/workbench/browser/parts/statusbar/statusbarPart'
import { IStatusbarService } from 'vs/workbench/services/statusbar/browser/statusbar'
import { ISemanticSimilarityService, SemanticSimilarityService } from 'vs/workbench/services/semanticSimilarity/common/semanticSimilarityService'
import { IHistoryService } from 'vs/workbench/services/history/common/history'
import { HistoryService } from 'vs/workbench/services/history/browser/historyService'
import { Action2, MenuId, registerAction2 } from 'vs/platform/actions/common/actions'
import { Categories } from 'vs/platform/action/common/actionCommonCategories'
import { ContextKeyExpr } from 'vs/platform/contextkey/common/contextkey'
import { IDropdownMenuActionViewItemOptions } from 'vs/base/browser/ui/dropdown/dropdownActionViewItem'
import { IAction } from 'vs/base/common/actions'
import { BaseActionViewItem } from 'vs/base/browser/ui/actionbar/actionViewItems'
import { IOutlineService } from 'vs/workbench/services/outline/browser/outline'
import { OutlineService } from 'vs/workbench/services/outline/browser/outlineService'
import { ICustomEditorService } from 'vs/workbench/contrib/customEditor/common/customEditor'
import { CustomEditorService } from 'vs/workbench/contrib/customEditor/browser/customEditors'
import { WebviewService } from 'vs/workbench/contrib/webview/browser/webviewService'
import { IWebviewWorkbenchService, WebviewEditorService } from 'vs/workbench/contrib/webviewPanel/browser/webviewWorkbenchService'
import { IWebviewService } from 'vs/workbench/contrib/webview/browser/webview'
import { IWebviewViewService, WebviewViewService } from 'vs/workbench/contrib/webviewView/browser/webviewViewService'
import { ILifecycleService, LifecyclePhase } from 'vs/workbench/services/lifecycle/common/lifecycle'
import { Parts, Position, positionToString } from 'vs/workbench/services/layout/browser/layoutService'
import { EditorPaneDescriptor, IEditorPaneRegistry } from 'vs/workbench/browser/editor'
import { EditorPane } from 'vs/workbench/browser/parts/editor/editorPane'
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry'
import { IStorageService } from 'vs/platform/storage/common/storage'
import { IThemeService } from 'vs/platform/theme/common/themeService'
import { ConfirmResult } from 'vs/platform/dialogs/common/dialogs'
import { OpenEditor, wrapOpenEditor } from './tools/editor'
import getBulkEditServiceOverride from './bulkEdit'
import getLayoutServiceOverride from './layout'
import { changeUrlDomain } from './tools/url'
import { registerAssets } from '../assets'

const paneCompositeParts = new Map<ViewContainerLocation, IPaneCompositePart>()
const paneCompositeSelectorParts = new Map<ViewContainerLocation, IPaneCompositeSelectorPart>()

class PaneCompositePartService implements IPaneCompositePartService {
  _serviceBrand: undefined
  onDidPaneCompositeOpen = Event.None
  onDidPaneCompositeClose = Event.None
  async openPaneComposite (id: string | undefined, viewContainerLocation: ViewContainerLocation, focus?: boolean): Promise<IPaneComposite | undefined> {
    return this.getPartByLocation(viewContainerLocation)?.openPaneComposite(id, focus)
  }

  getActivePaneComposite (viewContainerLocation: ViewContainerLocation) {
    return this.getPartByLocation(viewContainerLocation)?.getActivePaneComposite()
  }

  getPaneComposite (id: string, viewContainerLocation: ViewContainerLocation) {
    return this.getPartByLocation(viewContainerLocation)?.getPaneComposite(id)
  }

  getPaneComposites (viewContainerLocation: ViewContainerLocation) {
    return this.getPartByLocation(viewContainerLocation)?.getPaneComposites() ?? []
  }

  getPinnedPaneCompositeIds (viewContainerLocation: ViewContainerLocation): string[] {
    return this.getSelectorPartByLocation(viewContainerLocation)?.getPinnedPaneCompositeIds() ?? []
  }

  getVisiblePaneCompositeIds (viewContainerLocation: ViewContainerLocation): string[] {
    return this.getSelectorPartByLocation(viewContainerLocation)?.getVisiblePaneCompositeIds() ?? []
  }

  getProgressIndicator (id: string, viewContainerLocation: ViewContainerLocation): IProgressIndicator | undefined {
    return this.getPartByLocation(viewContainerLocation)?.getProgressIndicator(id)
  }

  hideActivePaneComposite (viewContainerLocation: ViewContainerLocation): void {
    this.getPartByLocation(viewContainerLocation)?.hideActivePaneComposite()
  }

  getLastActivePaneCompositeId (viewContainerLocation: ViewContainerLocation): string {
    return this.getPartByLocation(viewContainerLocation)!.getLastActivePaneCompositeId()
  }

  showActivity (id: string, viewContainerLocation: ViewContainerLocation, badge: IBadge, clazz?: string, priority?: number): IDisposable {
    return this.getSelectorPartByLocation(viewContainerLocation)!.showActivity(id, badge, clazz, priority)
  }

  private getPartByLocation (viewContainerLocation: ViewContainerLocation): IPaneCompositePart | undefined {
    return paneCompositeParts.get(viewContainerLocation)
  }

  private getSelectorPartByLocation (viewContainerLocation: ViewContainerLocation): IPaneCompositeSelectorPart | undefined {
    return paneCompositeSelectorParts.get(viewContainerLocation)
  }
}

function createPart (id: string, role: string, classes: string[]): HTMLElement {
  const part = document.createElement(role === 'status' ? 'footer' /* Use footer element for status bar #98376 */ : 'div')
  part.classList.add('part', ...classes)
  part.id = id
  part.setAttribute('role', role)
  if (role === 'status') {
    part.setAttribute('aria-live', 'off')
  }

  return part
}

function renderPart (id: string, role: string, classes: string[], part: Part, container: HTMLElement): IDisposable {
  const partContainer = createPart(id, role, classes)
  container.append(partContainer)
  partContainer.oncontextmenu = () => false
  part.create(partContainer)
  function layout () {
    part.layout(
      Math.max(part.minimumWidth, Math.min(part.maximumWidth, container.offsetWidth)),
      Math.max(part.minimumHeight, Math.min(part.maximumHeight, container.offsetHeight)),
      0, 0
    )
  }
  part.onDidVisibilityChange((visible) => {
    if (visible) {
      layout()
    }
  })
  layout()
  const observer = new ResizeObserver(layout)
  observer.observe(container)

  return {
    dispose () {
      return observer.disconnect()
    }
  }
}

function renderActivitybarPar (container: HTMLElement): IDisposable {
  const activitybarPart = StandaloneServices.get(IInstantiationService).createInstance(ActivitybarPart, paneCompositeParts.get(ViewContainerLocation.Sidebar)!)
  paneCompositeSelectorParts.set(ViewContainerLocation.Sidebar, activitybarPart)

  // eslint-disable-next-line dot-notation
  activitybarPart['_register'](renderPart(Parts.ACTIVITYBAR_PART, 'none', ['activitybar', 'left'], activitybarPart, container))

  return activitybarPart
}

function renderSidebarPart (container: HTMLElement): IDisposable {
  const sidebarPart = StandaloneServices.get(IInstantiationService).createInstance(SidebarPart)
  paneCompositeParts.set(ViewContainerLocation.Sidebar, sidebarPart)

  // eslint-disable-next-line dot-notation
  sidebarPart['_register'](renderPart(Parts.SIDEBAR_PART, 'none', ['sidebar', 'left'], sidebarPart, container))

  if (sidebarPart.getPaneComposites().length > 0) {
    void sidebarPart.openPaneComposite(sidebarPart.getPaneComposites()[0]!.id)
  }

  return sidebarPart
}

function renderPanelPart (container: HTMLElement): IDisposable {
  const panelPart = StandaloneServices.get(IInstantiationService).createInstance(PanelPart)
  paneCompositeSelectorParts.set(ViewContainerLocation.Panel, panelPart)
  paneCompositeParts.set(ViewContainerLocation.Panel, panelPart)

  // eslint-disable-next-line dot-notation
  panelPart['_register'](renderPart(Parts.PANEL_PART, 'none', ['panel', 'basepanel', positionToString(Position.LEFT)], panelPart, container))

  if (panelPart.getPaneComposites().length > 0) {
    void panelPart.openPaneComposite(panelPart.getPaneComposites()[0]!.id)
  }

  return panelPart
}

function renderEditorPart (container: HTMLElement): IDisposable {
  const editorPart = StandaloneServices.get(IEditorGroupsService) as EditorPart

  return renderPart(Parts.EDITOR_PART, 'main', ['editor'], editorPart, container)
}

function renderStatusBarPart (container: HTMLElement): IDisposable {
  const statusBarPart = StandaloneServices.get(IStatusbarService) as StatusbarPart

  return renderPart(Parts.STATUSBAR_PART, 'status', ['statusbar'], statusBarPart, container)
}

type Label = string | {
  short: string
  medium: string
  long: string
}
interface EditorPanelOption {
  readonly id: string
  name: string
  renderBody (container: HTMLElement): IDisposable
}

interface SimpleEditorInput extends EditorInput {
  setName (name: Label): void
  setTitle (title: Label): void
  setDescription (description: Label): void
  setDirty (dirty: boolean): void
}

function registerEditorPane (options: EditorPanelOption): { disposable: IDisposable, CustomEditorInput: new (closeHandler?: IEditorCloseHandler) => SimpleEditorInput } {
  class CustomEditorPane extends EditorPane {
    private content?: HTMLElement
    constructor (
      @ITelemetryService telemetryService: ITelemetryService,
      @IThemeService themeService: IThemeService,
      @IStorageService storageService: IStorageService
    ) {
      super(options.id, telemetryService, themeService, storageService)
    }

    protected override createEditor (parent: HTMLElement): void {
      this.content = $('.editor-pane-content')
      this.content.style.display = 'flex'
      this.content.style.alignItems = 'stretch'
      append(parent, this.content)
      this._register(options.renderBody(this.content))
    }

    override layout (dimension: Dimension): void {
      this.content!.style.height = `${dimension.height}px`
      this.content!.style.width = `${dimension.width}px`
    }
  }

  class CustomEditorInput extends EditorInput implements SimpleEditorInput {
    static readonly ID: string = `workbench.editors.${options.id}Input`

    private name: string = options.name
    private title: Label = options.name
    private description: Label = options.name
    private dirty: boolean = false

    constructor (public override readonly closeHandler?: IEditorCloseHandler) {
      super()
    }

    override get typeId (): string {
      return CustomEditorInput.ID
    }

    override get resource (): URI | undefined {
      return undefined
    }

    public setName (name: string) {
      this.name = name
      this._onDidChangeLabel.fire()
    }

    public setTitle (title: string) {
      this.title = title
      this._onDidChangeLabel.fire()
    }

    public setDescription (description: string) {
      this.description = description
      this._onDidChangeLabel.fire()
    }

    private getLabelValue (label: Label, verbosity?: Verbosity) {
      if (typeof label === 'string') {
        return label
      }
      switch (verbosity) {
        case Verbosity.SHORT:
          return label.short
        case Verbosity.LONG:
          return label.long
        case Verbosity.MEDIUM:
        default:
          return label.medium
      }
    }

    override getName (): string {
      return this.name
    }

    override getTitle (verbosity?: Verbosity) {
      return this.getLabelValue(this.title, verbosity)
    }

    override getDescription (verbosity?: Verbosity): string {
      return this.getLabelValue(this.description, verbosity)
    }

    override isDirty () {
      return this.dirty
    }

    public setDirty (dirty: boolean) {
      this.dirty = dirty
      this._onDidChangeDirty.fire()
    }
  }

  const disposable = Registry.as<IEditorPaneRegistry>(EditorExtensions.EditorPane).registerEditorPane(
    EditorPaneDescriptor.create(
      CustomEditorPane,
      options.id,
      options.name
    ),
    [new SyncDescriptor(CustomEditorInput)])

  return {
    disposable,
    CustomEditorInput
  }
}

interface CustomViewOption {
  readonly id: string
  name: string
  order?: number
  renderBody (container: HTMLElement): IDisposable
  location: ViewContainerLocation
  icon?: string
  canMoveView?: boolean
  default?: boolean
  actions?: {
    id: string
    title: string
    tooltip?: string
    order?: number
    run? (accessor: ServicesAccessor): Promise<void>
    icon?: keyof typeof Codicon
    render?(container: HTMLElement): void
  }[]
}

function registerCustomView (options: CustomViewOption): IDisposable {
  const iconUrl = options.icon != null ? URI.parse(options.icon) : undefined

  const VIEW_CONTAINER = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
    id: options.id,
    title: options.name,
    order: options.order,
    ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [options.id, { mergeViewWithContainerWhenSingleView: true }]),
    hideIfEmpty: true,
    icon: iconUrl
  }, options.location)

  const views: IViewDescriptor[] = [{
    id: options.id,
    name: options.name,
    canToggleVisibility: false,
    ctorDescriptor: new SyncDescriptor(class extends ViewPane {
      private content?: HTMLElement

      protected override renderBody (container: HTMLElement): void {
        super.renderBody(container)
        this.content = $('.view-pane-content')
        this.content.style.display = 'flex'
        this.content.style.alignItems = 'stretch'
        append(container, this.content)
        this._register(options.renderBody(this.content))
      }

      public override getActionViewItem (action: IAction, actionOptions?: IDropdownMenuActionViewItemOptions) {
        const customAction = (options.actions ?? []).find(customAction => customAction.id === action.id)
        if (customAction?.render != null) {
          return new class extends BaseActionViewItem {
            constructor () { super(null, action) }
            override render = customAction!.render!
          }()
        }
        return super.getActionViewItem(action, actionOptions)
      }

      protected override layoutBody (height: number, width: number): void {
        this.content!.style.height = `${height}px`
        this.content!.style.width = `${width}px`
      }
    }),
    canMoveView: options.canMoveView ?? true,
    containerIcon: iconUrl
  }]

  Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews(views, VIEW_CONTAINER)

  if (options.default ?? false) {
    void StandaloneServices.get(ILifecycleService).when(LifecyclePhase.Eventually).then(() => {
      void StandaloneServices.get(IViewsService).openViewContainer(options.id)
    })
  }

  const disposableCollection = new DisposableStore()
  disposableCollection.add({
    dispose () {
      Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).deregisterViews(views, VIEW_CONTAINER)
      Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).deregisterViewContainer(VIEW_CONTAINER)
    }
  })

  for (const action of options.actions ?? []) {
    disposableCollection.add(registerAction2(class extends Action2 {
      constructor () {
        super({
          id: action.id,
          title: { value: action.title, original: action.title },
          category: Categories.View,
          menu: [{
            id: MenuId.ViewTitle,
            when: ContextKeyExpr.equals('view', options.id),
            group: 'navigation',
            order: action.order
          }, {
            id: MenuId.CommandPalette
          }],
          tooltip: action.tooltip,
          icon: action.icon != null ? Codicon[action.icon] : undefined
        })
      }

      run = action.run ?? (async () => {})
    }))
  }

  return disposableCollection
}

class EditorDropService implements IEditorDropService {
  declare readonly _serviceBrand: undefined

  constructor (@IEditorGroupsService private readonly editorPart: EditorPart) { }

  createEditorDropTarget (container: HTMLElement, delegate: IEditorDropTargetDelegate): IDisposable {
    return this.editorPart.createEditorDropTarget(container, delegate)
  }
}

function isEditorPartVisible (): boolean {
  const editorPart = StandaloneServices.get(IEditorGroupsService) as EditorPart
  return editorPart.getContainer()?.isConnected ?? false
}

class MonacoEditorService extends EditorService {
  constructor (
    _openEditorFallback: OpenEditor | undefined,
    @IEditorGroupsService _editorGroupService: IEditorGroupsService,
    @IInstantiationService instantiationService: IInstantiationService,
    @IFileService fileService: IFileService,
    @IConfigurationService configurationService: IConfigurationService,
    @IWorkspaceContextService contextService: IWorkspaceContextService,
    @IUriIdentityService uriIdentityService: IUriIdentityService,
    @IEditorResolverService editorResolverService: IEditorResolverService,
    @IWorkspaceTrustRequestService workspaceTrustRequestService: IWorkspaceTrustRequestService,
    @IHostService hostService: IHostService,
    @ITextEditorService textEditorService: ITextEditorService,
    @ITextModelService textModelService: ITextModelService
  ) {
    super(
      _editorGroupService,
      instantiationService,
      fileService,
      configurationService,
      contextService,
      uriIdentityService,
      editorResolverService,
      workspaceTrustRequestService,
      hostService,
      textEditorService
    )

    this.openEditor = wrapOpenEditor(textModelService, this.openEditor.bind(this), _openEditorFallback)
  }

  override get activeTextEditorControl () {
    // By default, only the editor inside the EditorPart can be "active" here, hack it so the active editor is now the focused editor if it exists
    // It is required for the editor.addAction to be able to add an entry in the editor action menu
    return super.activeTextEditorControl ?? StandaloneServices.get(ICodeEditorService).getFocusedCodeEditor() ?? undefined
  }

  // Override openEditor to fallback on user function is the EditorPart is not visible
  override openEditor(editor: EditorInput, options?: IEditorOptions, group?: PreferredGroup): Promise<IEditorPane | undefined>
  override openEditor(editor: IUntypedEditorInput, group?: PreferredGroup): Promise<IEditorPane | undefined>
  override openEditor(editor: IResourceEditorInput, group?: PreferredGroup): Promise<IEditorPane | undefined>
  override openEditor(editor: ITextResourceEditorInput | IUntitledTextResourceEditorInput, group?: PreferredGroup): Promise<IEditorPane | undefined>
  override openEditor(editor: IResourceDiffEditorInput, group?: PreferredGroup): Promise<ITextDiffEditorPane | undefined>
  override openEditor(editor: EditorInput | IUntypedEditorInput, optionsOrPreferredGroup?: IEditorOptions | PreferredGroup, preferredGroup?: PreferredGroup): Promise<IEditorPane | undefined>
  override async openEditor (editor: EditorInput | IUntypedEditorInput, optionsOrPreferredGroup?: IEditorOptions | PreferredGroup, preferredGroup?: PreferredGroup): Promise<IEditorPane | undefined> {
    // Do not try to open the file if the editor part is not displayed, let the fallback happen
    if (!isEditorPartVisible()) {
      return undefined
    }

    return super.openEditor(editor, optionsOrPreferredGroup, preferredGroup)
  }
}

let webviewIframeAlternateDomains: string | undefined
registerAssets({
  'vs/workbench/contrib/webview/browser/pre/service-worker.js': () => changeUrlDomain(new URL('../../vscode/vs/workbench/contrib/webview/browser/pre/service-worker.js', import.meta.url).href, webviewIframeAlternateDomains),
  'vs/workbench/contrib/webview/browser/pre/index.html': () => changeUrlDomain(new URL('../assets/webview/index.html', import.meta.url).href, webviewIframeAlternateDomains),
  'vs/workbench/contrib/webview/browser/pre/index-no-csp.html': () => changeUrlDomain(new URL('../assets/webview/index-no-csp.html', import.meta.url).href, webviewIframeAlternateDomains),
  'vs/workbench/contrib/webview/browser/pre/fake.html': () => changeUrlDomain(new URL('../../vscode/vs/workbench/contrib/webview/browser/pre/fake.html', import.meta.url).href, webviewIframeAlternateDomains)
})

export default function getServiceOverride (openEditorFallback?: OpenEditor, _webviewIframeAlternateDomains?: string): IEditorOverrideServices {
  if (_webviewIframeAlternateDomains != null) {
    webviewIframeAlternateDomains = _webviewIframeAlternateDomains
  }
  return {
    ...getLayoutServiceOverride(),
    ...getBulkEditServiceOverride(),
    [IViewsService.toString()]: new SyncDescriptor(ViewsService),
    [IViewDescriptorService.toString()]: new SyncDescriptor(ViewDescriptorService),
    [IActivityService.toString()]: new SyncDescriptor(ActivityService),
    [IPaneCompositePartService.toString()]: new SyncDescriptor(PaneCompositePartService),
    [IHoverService.toString()]: new SyncDescriptor(HoverService),
    [IExplorerService.toString()]: new SyncDescriptor(ExplorerService),

    [ICodeEditorService.toString()]: new SyncDescriptor(CodeEditorService),
    [ITextEditorService.toString()]: new SyncDescriptor(TextEditorService),
    [IEditorGroupsService.toString()]: new SyncDescriptor(EditorPart),
    [IStatusbarService.toString()]: new SyncDescriptor(StatusbarPart),
    [IEditorDropService.toString()]: new SyncDescriptor(EditorDropService),
    [IEditorService.toString()]: new SyncDescriptor(MonacoEditorService, [openEditorFallback]),
    [IEditorResolverService.toString()]: new SyncDescriptor(EditorResolverService),
    [IBreadcrumbsService.toString()]: new SyncDescriptor(BreadcrumbsService),
    [IContextViewService.toString()]: new SyncDescriptor(ContextViewService),
    [IUntitledTextEditorService.toString()]: new SyncDescriptor(UntitledTextEditorService),
    [ISemanticSimilarityService.toString()]: new SyncDescriptor(SemanticSimilarityService),
    [IHistoryService.toString()]: new SyncDescriptor(HistoryService),
    [IOutlineService.toString()]: new SyncDescriptor(OutlineService),
    [ICustomEditorService.toString()]: new SyncDescriptor(CustomEditorService),
    [IWebviewService.toString()]: new SyncDescriptor(WebviewService),
    [IWebviewViewService.toString()]: new SyncDescriptor(WebviewViewService),
    [IWebviewWorkbenchService.toString()]: new SyncDescriptor(WebviewEditorService)
  }
}

export {
  ViewContainerLocation,
  CustomViewOption,
  registerCustomView,
  EditorPanelOption,
  IEditorCloseHandler,
  ConfirmResult,
  registerEditorPane,
  renderSidebarPart,
  renderActivitybarPar,
  renderPanelPart,
  renderEditorPart,
  renderStatusBarPart,
  isEditorPartVisible,

  OpenEditor,
  IEditorOptions,
  IResolvedTextEditorModel,
  IReference,

  HoverService,
  ActivityService,
  StatusbarPart,
  SidebarPart,
  ActivitybarPart,
  PanelPart
}