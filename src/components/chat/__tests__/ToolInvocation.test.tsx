import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { ToolInvocation } from '../ToolInvocation';

describe('ToolInvocation', () => {
  afterEach(() => {
    cleanup();
  });

  it('displays user-friendly name for str_replace_editor tool', () => {
    render(
      <ToolInvocation 
        toolName="str_replace_editor" 
        state="result" 
        result={{ success: true }} 
      />
    );
    
    expect(screen.getByText('Creating files')).toBeDefined();
  });

  it('displays original tool name when no mapping exists', () => {
    render(
      <ToolInvocation 
        toolName="unknown_tool" 
        state="result" 
        result={{ success: true }} 
      />
    );
    
    expect(screen.getByText('unknown_tool')).toBeDefined();
  });

  it('shows green dot when tool has completed successfully', () => {
    const { container } = render(
      <ToolInvocation 
        toolName="create_file" 
        state="result" 
        result={{ success: true }} 
      />
    );
    
    const greenDot = container.querySelector('.bg-emerald-500');
    expect(greenDot).toBeTruthy();
    expect(screen.getByText('Creating file')).toBeDefined();
  });

  it('shows loading spinner when tool is in progress', () => {
    const { container } = render(
      <ToolInvocation 
        toolName="update_file" 
        state="call" 
      />
    );
    
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeTruthy();
    expect(screen.getByText('Updating file')).toBeDefined();
  });

  it('displays correct mapping for create_file tool', () => {
    render(
      <ToolInvocation 
        toolName="create_file" 
        state="result" 
        result={{ success: true }} 
      />
    );
    
    expect(screen.getByText('Creating file')).toBeDefined();
  });

  it('displays correct mapping for update_file tool', () => {
    render(
      <ToolInvocation 
        toolName="update_file" 
        state="result" 
        result={{ success: true }} 
      />
    );
    
    expect(screen.getByText('Updating file')).toBeDefined();
  });

  it('displays correct mapping for delete_file tool', () => {
    render(
      <ToolInvocation 
        toolName="delete_file" 
        state="result" 
        result={{ success: true }} 
      />
    );
    
    expect(screen.getByText('Deleting file')).toBeDefined();
  });

  it('displays correct mapping for list_files tool', () => {
    render(
      <ToolInvocation 
        toolName="list_files" 
        state="result" 
        result={{ success: true }} 
      />
    );
    
    expect(screen.getByText('Listing files')).toBeDefined();
  });

  it('displays correct mapping for view_file tool', () => {
    render(
      <ToolInvocation 
        toolName="view_file" 
        state="result" 
        result={{ success: true }} 
      />
    );
    
    expect(screen.getByText('Reading file')).toBeDefined();
  });

  it('renders with correct CSS classes', () => {
    const { container } = render(
      <ToolInvocation 
        toolName="create_file" 
        state="result" 
        result={{ success: true }} 
      />
    );
    
    const toolDiv = container.firstChild as HTMLElement;
    expect(toolDiv?.className).toContain('inline-flex');
    expect(toolDiv?.className).toContain('items-center');
    expect(toolDiv?.className).toContain('bg-neutral-50');
  });
});