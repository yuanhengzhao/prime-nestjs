import { snakeCase } from 'lodash';
import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  name?: string;

  constructor() {
    super();
    this.name = 'Sama Naming Strategy';
  }

  override tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName || snakeCase(targetName);
  }

  override columnName(propertyName: string, customName: string | undefined, embeddedPrefixes: string[]): string {
    let name = customName || snakeCase(propertyName);

    if (embeddedPrefixes.length) {
      name = `${snakeCase(embeddedPrefixes.join('_'))}_${name}`;
    }
    return name;
  }

  override relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  override primaryKeyName(tableOrName: string | Table, columnNames: string[]): string {
    const tableName = this.getName(tableOrName);
    return `PK_${snakeCase(tableName)}_${snakeCase(columnNames.join('_'))}`;
  }

  override uniqueConstraintName(tableOrName: string | Table, columnNames: string[]): string {
    const tableName = this.getName(tableOrName);
    return `UQ_${snakeCase(tableName)}_${snakeCase(columnNames.join('_'))}`;
  }

  override relationConstraintName(tableOrName: string | Table, columnNames: string[], _where?: string): string {
    const tableName = this.getName(tableOrName);
    return `REL_${snakeCase(tableName)}_${snakeCase(columnNames.join('_'))}`;
  }

  override defaultConstraintName(tableOrName: string | Table, columnName: string): string {
    const tableName = this.getName(tableOrName);
    return `DF_${snakeCase(tableName)}_${snakeCase(columnName)}`;
  }

  override foreignKeyName(
    tableOrName: string | Table,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
  ): string {
    const tableName = this.getName(tableOrName);

    let name = `FK_${snakeCase(tableName)}_${snakeCase(columnNames.join('_'))}`;
    if (referencedTablePath) {
      name += `_${snakeCase(referencedTablePath)}`;
    }
    if (referencedColumnNames) {
      name += `_${snakeCase(referencedColumnNames.join('_'))}`;
    }
    return name;
  }

  override indexName(tableOrName: string | Table, columns: string[], _where?: string): string {
    const tableName = this.getName(tableOrName);
    return `IDX_${snakeCase(tableName)}_${snakeCase(columns.join('_'))}`;
  }

  override checkConstraintName(tableOrName: string | Table, _expression?: string): string {
    const tableName = this.getName(tableOrName);
    return `CHK_${snakeCase(tableName)}`;
  }

  override exclusionConstraintName(tableOrName: string | Table, _expression?: string): string {
    const tableName = this.getName(tableOrName);

    return `XCL_${snakeCase(tableName)}`;
  }

  override joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  override joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string, _secondPropertyName?: string): string {
    return snakeCase(`${firstTableName}_${secondTableName}_${firstPropertyName}`);
  }

  override joinTableColumnDuplicationPrefix(columnName: string, index: number): string {
    return snakeCase(`${columnName}_${index}`);
  }

  override joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snakeCase(`${tableName}_${columnName || propertyName}`);
  }

  override joinTableInverseColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return this.joinTableColumnName(tableName, propertyName, columnName);
  }

  private getName(tableOrName: string | Table) {
    return tableOrName instanceof Table ? tableOrName.name : tableOrName;
  }
}
