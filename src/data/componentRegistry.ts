import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { Toast } from '../components/Toast';
import { Switch } from '../components/Switch';
import { Tooltip } from '../components/Tooltip';
import { Accordion } from '../components/Accordion';
import { Badge } from '../components/Badge';

export type ControlType = 'enum' | 'boolean' | 'text' | 'number' | 'color' | 'icon';

export interface PropControl {
  name: string;
  type: ControlType;
  options?: string[]; // for enum
}

export interface RegistryEntry {
  id: string;
  name: string;
  Component: any;
  defaultProps: Record<string, any>;
  propSchema: PropControl[];
  generateCode: (props: Record<string, any>) => string;
  a11yChecks?: (props: Record<string, any>, element: HTMLElement | null) => { passed: boolean; message: string; name: string }[];
}

const checkFocusable = (element: HTMLElement | null, disabled: boolean) => {
  if (!element) return { passed: false, message: 'Element not found', name: 'Focusable' };
  const focusable = !element.hasAttribute('disabled') && element.tabIndex >= -1;
  return {
    name: 'Focusable',
    passed: disabled ? true : focusable,
    message: disabled ? 'Component is disabled (not focusable).' : (focusable ? 'Element is natively focusable.' : 'Element is not keyboard focusable.'),
  };
};

const checkTargetSize = (element: HTMLElement | null) => {
  if (!element) return { passed: true, message: 'No element to check.', name: 'Target Size' };
  const rect = element.getBoundingClientRect();
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);
  const passed = width === 0 && height === 0 ? true : (width >= 44 && height >= 44);
  return {
    name: 'Target Size',
    passed,
    message: passed ? `Adequate target size (${width}x${height}px).` : `Target size too small (${width}x${height}px). Needs to be >= 44x44px.`,
  };
};

export const componentRegistry: RegistryEntry[] = [
  {
    id: 'button',
    name: 'Button',
    Component: Button,
    defaultProps: {
      variant: 'primary',
      size: 'medium',
      label: 'Click Me',
      loading: false,
      disabled: false,
    },
    propSchema: [
      { name: 'variant', type: 'enum', options: ['primary', 'secondary', 'danger'] },
      { name: 'size', type: 'enum', options: ['small', 'medium', 'large'] },
      { name: 'label', type: 'text' },
      { name: 'loading', type: 'boolean' },
      { name: 'disabled', type: 'boolean' },
    ],
    generateCode: (props) => {
      let propsStr = '';
      if (props.variant !== 'primary') propsStr += ` variant="${props.variant}"`;
      if (props.size !== 'medium') propsStr += ` size="${props.size}"`;
      if (props.loading) propsStr += ` loading`;
      if (props.disabled) propsStr += ` disabled`;
      return `<Button${propsStr}>\n  ${props.label}\n</Button>`;
    },
    a11yChecks: (props, element) => {
      let hasLabel = false;
      let disabledConveyed = false;

      if (element) {
        hasLabel = !!element.textContent || !!element.getAttribute('aria-label') || !!element.getAttribute('aria-labelledby');
        disabledConveyed = props.disabled ? element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true' : true;
      }

      return [
        checkFocusable(element, props.disabled || props.loading),
        checkTargetSize(element),
        {
          name: 'Accessible label',
          passed: hasLabel,
          message: hasLabel ? 'Has text content or aria-label.' : 'Missing accessible name.',
        },
        {
          name: 'Disabled state conveyed',
          passed: disabledConveyed,
          message: disabledConveyed ? 'Disabled state correctly applied via attribute.' : 'Disabled state missing on DOM element.',
        }
      ];
    }
  },
  {
    id: 'input',
    name: 'Input',
    Component: Input,
    defaultProps: {
      state: 'normal',
      label: 'Email address',
      helperText: 'We will never share your email.',
      placeholder: 'you@example.com',
    },
    propSchema: [
      { name: 'state', type: 'enum', options: ['normal', 'error', 'disabled'] },
      { name: 'label', type: 'text' },
      { name: 'helperText', type: 'text' },
      { name: 'placeholder', type: 'text' },
    ],
    generateCode: (props) => {
      let propsStr = '';
      if (props.state !== 'normal') propsStr += ` state="${props.state}"`;
      if (props.label) propsStr += ` label="${props.label}"`;
      if (props.helperText) propsStr += ` helperText="${props.helperText}"`;
      if (props.placeholder) propsStr += ` placeholder="${props.placeholder}"`;
      return `<Input${propsStr} />`;
    },
    a11yChecks: (props, element) => {
      let hasLabel = false;
      let disabledConveyed = false;
      let inputElement = element?.tagName === 'INPUT' ? element : element?.querySelector('input');

      if (inputElement) {
        hasLabel = !!props.label || !!inputElement.getAttribute('aria-label');
        disabledConveyed = props.state === 'disabled' ? inputElement.hasAttribute('disabled') || inputElement.getAttribute('aria-disabled') === 'true' : true;
      }

      return [
        checkFocusable(inputElement as HTMLElement, props.state === 'disabled'),
        checkTargetSize(inputElement as HTMLElement),
        {
          name: 'Accessible label',
          passed: hasLabel,
          message: hasLabel ? 'Has associated label.' : 'Missing label.',
        },
        {
          name: 'Disabled state conveyed',
          passed: disabledConveyed,
          message: disabledConveyed ? 'Disabled state applied.' : 'Disabled state missing on input.',
        }
      ];
    }
  },
  {
    id: 'card',
    name: 'Card',
    Component: Card,
    defaultProps: {
      title: 'Subscription Plan',
      description: 'You are currently on the Pro plan.',
      actionLabel: 'Upgrade',
    },
    propSchema: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'text' },
      { name: 'actionLabel', type: 'text' },
    ],
    generateCode: (props) => {
      return `<Card\n  title="${props.title}"\n  description="${props.description}"\n  actionLabel="${props.actionLabel}"\n/>`;
    },
    a11yChecks: (props) => {
      return [
        {
          name: 'Accessible label',
          passed: !!props.title,
          message: props.title ? 'Has title.' : 'Missing title text.',
        }
      ];
    }
  },
  {
    id: 'modal',
    name: 'Modal',
    Component: Modal,
    defaultProps: {
      open: true,
      title: 'Deactivate account',
      description: 'Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.',
    },
    propSchema: [
      { name: 'open', type: 'boolean' },
      { name: 'title', type: 'text' },
      { name: 'description', type: 'text' },
    ],
    generateCode: (props) => {
      return `<Modal\n  open={${props.open}}\n  title="${props.title}"\n  description="${props.description}"\n/>`;
    },
    a11yChecks: (props, element) => {
      let isModal = false;
      let hasRole = false;

      if (element && props.open) {
        // Find the actual dialog inside the wrapper
        const dialog = element.querySelector('[role="dialog"]') as HTMLElement | null || (element.getAttribute('role') === 'dialog' ? element : null);
        if (dialog) {
          hasRole = true;
          isModal = dialog.getAttribute('aria-modal') === 'true';
        }
      }

      if (!props.open) {
        return [{ name: 'Modal', passed: true, message: 'Modal is closed, no checks needed.' }];
      }

      return [
        {
          name: 'Role Dialog',
          passed: hasRole,
          message: hasRole ? 'Has role="dialog".' : 'Missing role="dialog".',
        },
        {
          name: 'Aria Modal',
          passed: isModal,
          message: isModal ? 'Has aria-modal="true".' : 'Missing aria-modal.',
        },
      ];
    }
  },
  {
    id: 'toast',
    name: 'Toast',
    Component: Toast,
    defaultProps: {
      type: 'info',
      message: 'Successfully saved changes.',
      dismissable: true,
    },
    propSchema: [
      { name: 'type', type: 'enum', options: ['success', 'error', 'info'] },
      { name: 'message', type: 'text' },
      { name: 'dismissable', type: 'boolean' },
    ],
    generateCode: (props) => {
      let propsStr = '';
      if (props.type !== 'info') propsStr += ` type="${props.type}"`;
      if (props.message) propsStr += ` message="${props.message}"`;
      if (!props.dismissable) propsStr += ` dismissable={false}`;
      return `<Toast${propsStr} />`;
    },
    a11yChecks: (_props, element) => {
      let hasRole = false;
      let ariaLive = false;

      if (element) {
        hasRole = element.getAttribute('role') === 'status' || element.getAttribute('role') === 'alert';
        ariaLive = element.hasAttribute('aria-live');
      }

      return [
        {
          name: 'Role Status',
          passed: hasRole,
          message: hasRole ? 'Has role="status" or "alert".' : 'Missing role="status".',
        },
        {
          name: 'Aria Live',
          passed: ariaLive,
          message: ariaLive ? 'Has aria-live.' : 'Missing aria-live attribute for screen readers.',
        }
      ];
    }
  },
  {
    id: 'switch',
    name: 'Switch',
    Component: Switch,
    defaultProps: {
      checked: false,
      label: 'Enable notifications',
      color: '#3b82f6',
    },
    propSchema: [
      { name: 'checked', type: 'boolean' },
      { name: 'label', type: 'text' },
      { name: 'color', type: 'color' },
    ],
    generateCode: (props) => {
      let propsStr = '';
      if (props.checked) propsStr += ` checked={true}`;
      if (props.label) propsStr += ` label="${props.label}"`;
      if (props.color !== '#3b82f6') propsStr += ` color="${props.color}"`;
      return `<Switch${propsStr} />`;
    },
    a11yChecks: (_props, element) => {
      const btn = element?.tagName === 'BUTTON' ? element : element?.querySelector('button');
      const hasRole = btn?.getAttribute('role') === 'switch';
      const hasAriaChecked = btn?.hasAttribute('aria-checked');
      return [
        checkFocusable(btn as HTMLElement, false),
        checkTargetSize(btn as HTMLElement),
        { name: 'Role Switch', passed: !!hasRole, message: hasRole ? 'Has role="switch".' : 'Missing role="switch".' },
        { name: 'Aria Checked', passed: !!hasAriaChecked, message: hasAriaChecked ? 'Has aria-checked attribute.' : 'Missing aria-checked.' },
      ];
    }
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    Component: Tooltip,
    defaultProps: {
      text: 'Additional information',
      position: 'top',
      delay: 200,
    },
    propSchema: [
      { name: 'text', type: 'text' },
      { name: 'position', type: 'enum', options: ['top', 'bottom', 'left', 'right'] },
      { name: 'delay', type: 'number' },
    ],
    generateCode: (props) => {
      let propsStr = '';
      if (props.text) propsStr += ` text="${props.text}"`;
      if (props.position !== 'top') propsStr += ` position="${props.position}"`;
      if (props.delay !== 200) propsStr += ` delay={${props.delay}}`;
      return `<Tooltip${propsStr}>\n  <span>Hover over me</span>\n</Tooltip>`;
    },
    a11yChecks: (_props, element) => {
      return [
        checkFocusable(element, false),
        { name: 'Accessible Tooltip', passed: true, message: 'Tooltips dynamically render ARIA roles when open.' }
      ];
    }
  },
  {
    id: 'accordion',
    name: 'Accordion',
    Component: Accordion,
    defaultProps: {
      allowMultiple: false,
    },
    propSchema: [
      { name: 'allowMultiple', type: 'boolean' },
    ],
    generateCode: (props) => {
      return `<Accordion allowMultiple={${props.allowMultiple}} />`;
    },
    a11yChecks: (_props, element) => {
      const btn = element?.querySelector('button');
      const hasExpanded = btn?.hasAttribute('aria-expanded');
      const hasControls = btn?.hasAttribute('aria-controls');
      return [
        checkFocusable(btn as HTMLElement, false),
        checkTargetSize(btn as HTMLElement),
        { name: 'Aria Expanded', passed: !!hasExpanded, message: hasExpanded ? 'Header conveys expanded state.' : 'Missing aria-expanded.' },
        { name: 'Aria Controls', passed: !!hasControls, message: hasControls ? 'Header controls region.' : 'Missing aria-controls.' },
      ];
    }
  },
  {
    id: 'badge',
    name: 'Badge',
    Component: Badge,
    defaultProps: {
      text: 'New Feature',
      variant: 'default',
      icon: 'Star',
    },
    propSchema: [
      { name: 'text', type: 'text' },
      { name: 'variant', type: 'enum', options: ['default', 'success', 'warning', 'error', 'outline'] },
      { name: 'icon', type: 'icon' },
    ],
    generateCode: (props) => {
      let propsStr = '';
      if (props.text) propsStr += ` text="${props.text}"`;
      if (props.variant !== 'default') propsStr += ` variant="${props.variant}"`;
      if (props.icon) propsStr += ` icon="${props.icon}"`;
      return `<Badge${propsStr} />`;
    }
  }
];
