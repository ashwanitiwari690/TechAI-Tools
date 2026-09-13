import { Injectable } from '@angular/core';
import { AiTool } from '../../core/models/ai-tool.model';
import { AI_TOOLS } from './data/ai-tools.data';

/**
 * Data-access layer for AI tools. Currently backed by a static in-memory
 * array so the whole app runs without a backend. Every method returns a
 * value synchronously; to swap in a real API later, change the internal
 * implementation to use HttpClient and update return types to Observable/
 * Promise as needed — call sites were written against this narrow
 * interface specifically to make that swap low-risk.
 */
@Injectable({ providedIn: 'root' })
export class AiToolsService {
  getAll(): AiTool[] {
    return AI_TOOLS;
  }

  getFeatured(limit = 8): AiTool[] {
    return AI_TOOLS.filter((tool) => tool.featured).slice(0, limit);
  }

  getBySlug(slug: string): AiTool | undefined {
    return AI_TOOLS.find((tool) => tool.slug === slug);
  }

  getByCategory(category: string): AiTool[] {
    return AI_TOOLS.filter((tool) => tool.category === category);
  }

  getRelated(tool: AiTool, limit = 3): AiTool[] {
    return AI_TOOLS.filter((t) => t.slug !== tool.slug && t.category === tool.category).slice(0, limit);
  }

  findByName(name: string): AiTool | undefined {
    return AI_TOOLS.find((tool) => tool.name === name);
  }
}
