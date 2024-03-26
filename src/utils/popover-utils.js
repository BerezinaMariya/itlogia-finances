export class PopoverUtils {
    static initPopover() {
        const popoverBodyElement = document.getElementById('popover-body');
        document.querySelectorAll('[data-bs-toggle="popover"]')
            .forEach(popover => {
                new bootstrap.Popover(popover, {
                    html : true,
                    content: function () {
                        return popoverBodyElement.innerHTML;
                    }
                });
            });
    }
}
