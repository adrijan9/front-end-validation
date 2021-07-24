export default class Methods {
    /**
     * @var
     * @protected
     */
    protected BAIL: string;
    /**
     * @var
     * @protected
     */
    protected EXCLUDE_IF: string;
    /**
     * @var
     * @protected
     */
    protected methods: Record<any, any>;
    /**
     * @var
     * @protected
     */
    protected excluded: Array<string>;
    /**
     * @var
     * @protected
     */
    protected changers: Array<any>;
}
