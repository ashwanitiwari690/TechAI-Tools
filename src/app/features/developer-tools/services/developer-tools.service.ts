import { Injectable } from '@angular/core';
import { DeveloperToolMeta } from '../../../core/models/developer-tool.model';
import { DEVELOPER_TOOLS } from '../data/developer-tools.data';

@Injectable({ providedIn: 'root' })
export class DeveloperToolsDirectory {
  getAll(): DeveloperToolMeta[] {
    return DEVELOPER_TOOLS;
  }

  getBySlug(slug: string): DeveloperToolMeta | undefined {
    return DEVELOPER_TOOLS.find((tool) => tool.slug === slug);
  }

  getRelated(slug: string, limit = 4): DeveloperToolMeta[] {
    const current = this.getBySlug(slug);
    if (!current) {
      return DEVELOPER_TOOLS.slice(0, limit);
    }
    const sameCategory = DEVELOPER_TOOLS.filter((tool) => tool.slug !== slug && tool.category === current.category);
    const rest = DEVELOPER_TOOLS.filter((tool) => tool.slug !== slug && tool.category !== current.category);
    return [...sameCategory, ...rest].slice(0, limit);
  }
}
