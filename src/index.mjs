import PuddySqlEvents from './Events.mjs';
import PuddySqlInstance from './TinySQL.mjs';
import PuddySqlQuery from './TinySqlQuery.mjs';
import PuddySqlTags from './TinySqlTags.mjs';

class PuddySql {
  static Instance = PuddySqlInstance;
  static Query = PuddySqlQuery;
  static Tags = PuddySqlTags;
  static Events = PuddySqlEvents;

  /**
   * This constructor is intentionally blocked.
   *
   * ⚠️ You must NOT instantiate PuddySql directly.
   * To create a working instance, use {@link PuddySql.Instance}:
   *
   * ```js
   * const client = new PuddySql.Instance();
   * ```
   *
   * @constructor
   * @throws {Error} Always throws an error to prevent direct instantiation.
   */
  constructor() {
    throw new Error('You must use new PuddySql.Instance() to create your new instance.');
  }
}

export default PuddySql;
