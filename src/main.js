/// Import only needed Bootstrap components.
import { Popover } from 'bootstrap';

const popoverTriggerEl = document.querySelector('[data-bs-toggle="popover"]');

const DESKTOP_BREAKPOINT = 992;

const BASE_OPTIONS = {
  html: true,
  title: document.querySelector('[data-name="popover-title"]'),
  content: document.querySelector('[data-name="popover-content"]'),
};

let popover = null;
let containerOption = null;

const getContainerOption = (screenWidth) => (screenWidth < DESKTOP_BREAKPOINT ? '.card-footer' : 'body');

const createPopover = (popoverEl, options) => new Popover(popoverEl, options);

window.addEventListener('load', () => {
  containerOption = getContainerOption(window.innerWidth);
  popover = createPopover(popoverTriggerEl, {
    ...BASE_OPTIONS,
    container: containerOption,
  });
});

window.addEventListener('resize', (e) => {
  const newContainerOption = getContainerOption(e.target.innerWidth);
  if (containerOption !== newContainerOption) {
    popover.dispose();
    popover = createPopover(popoverTriggerEl, {
      ...BASE_OPTIONS,
      container: newContainerOption,
    });

    containerOption = newContainerOption;
  }
});

popoverTriggerEl.addEventListener('click', (e) => {
  const isExpanded = e.target.hasAttribute('aria-expanded');
  if (isExpanded) {
    e.target.removeAttribute('aria-expanded');
  } else {
    e.target.setAttribute('aria-expanded', 'true');
  }
});
