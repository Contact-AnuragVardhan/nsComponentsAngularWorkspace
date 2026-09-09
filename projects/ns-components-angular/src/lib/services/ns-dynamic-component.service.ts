import {
    Injectable,
    ApplicationRef,
    ComponentRef,
    Type,
    Injector,
    ViewContainerRef,
    EmbeddedViewRef,
    Renderer2,
    RendererFactory2
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NSDynamicComponentService {

    private renderer: Renderer2;

    constructor(
        private applicationRef: ApplicationRef,
        private injector: Injector,
        rendererFactory: RendererFactory2
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    /**
     * Create a component reference dynamically.
     * @param componentClass The component class to create.
     * @param viewContainerRef Optional ViewContainerRef to host the component.
     * @param inputs Optional object containing @Input properties to set on the component instance.
     */
    createComponentRef<T>(
        componentClass: Type<T>,
        viewContainerRef?: ViewContainerRef,
        inputs?: Partial<T>
    ): ComponentRef<T> {

        let componentRef: ComponentRef<T>;

        if (viewContainerRef) {

            componentRef = viewContainerRef.createComponent(componentClass, {
                injector: this.injector
            });

        } else {

            const containerElement = this.renderer.createElement('div');

            this.renderer.appendChild(
                document.body,
                containerElement
            );

            const tempViewContainerRef =
                this.createViewContainerRef(containerElement);

            componentRef =
                tempViewContainerRef.createComponent(componentClass, {
                    injector: this.injector
                });
        }

        if (componentRef) {

            if (inputs) {
                Object.assign(
                    componentRef.instance as any,
                    inputs
                );
            }

            componentRef.changeDetectorRef.detectChanges();
        }

        return componentRef;
    }

    private createViewContainerRef(
        element: HTMLElement
    ): ViewContainerRef {

        const embeddedView = this.applicationRef
            .components[0]
            .instance
            .viewContainerRef
            .createEmbeddedView({});

        this.applicationRef.attachView(embeddedView);

        embeddedView.rootNodes.forEach((node: any) => {
            this.renderer.appendChild(element, node);
        });

        return embeddedView.injector.get(ViewContainerRef);
    }

    getInstance<T>(
        componentRef: ComponentRef<T>
    ): T {

        return componentRef.instance;
    }

    getDomElement<T>(
        componentRef: ComponentRef<T>
    ): HTMLElement {

        return (
            componentRef.hostView as EmbeddedViewRef<any>
        ).rootNodes[0] as HTMLElement;
    }

    destroyComponent<T>(
        componentRef: ComponentRef<T>,
        delay = 0
    ): void {

        setTimeout(() => {

            this.applicationRef.detachView(
                componentRef.hostView
            );

            componentRef.destroy();

        }, delay);
    }
}