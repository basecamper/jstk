/*class JSTK
{
constructor() {}

static create( element, args )
{
switch ( element )
{
case "element":
case "htmlElement":
case "html":
return new _JstkHTMLElement( args );
}
}
}*/




TKJS = {
   htmlElement:
   class {
      constructor( args )
      {

      this._args = new TKJS.htmlElementProperties( args );
      this._children = [];
      this._element = document.createElement( this.args.has("type") ? this.args.type : "div" );
      this._parent = undefined;

      if ( this.args.has( "htmlProperties" ) )
      {
         this._setHtmlElementProperties( this.element, args.htmlProperties );
      }

         this.log("log","created" );
      }

      get children()       { return this._children; }
      set children( list ) { this._children = list; }
      get args()           { return this._args; }
      get element()        { return this._element; }
      get parent()         { return this._parent; }
      set parent( parent )
      {
         if ( parent instanceof jstkHTMLElement )
         {
            this._parent = parent;
         }
         else
         {
            this.log( "error","set parent(): parent not instance of jstkHTMLElement" );
         }
      }

      _setHtmlElementProperties( elementCurrentRoot, obj )
      {
         if ( obj )
         {
            for ( const e in obj )
            {
               if ( typeof( obj[e] ) == "Object" )
               {
                  if ( elementCurrentRoot[e] == undefined )
                  {
                     elementCurrentRoot[e] = {};
                  }
                  this._setHtmlElementProperties( elementCurrentRoot[e], obj[e] );
               }
               else
               {
                  this.element[e] = obj[e];
               }
            }
         }
      }

      addClass( className )
      {
         if ( this.element.classList.contains( className ) )
         {
            this.log("warn", "addClass(): classList already contains \"" +  className +"\"");
         }
         else
         {
            this.element.classList.add( className );
         }
         return this;
      }
      addChild( child )
      {
         if ( child instanceof jstkHTMLElement )
         {
            this.children.push( child );
            this.element.appendChild( child );
            child.parent = this;
         }
         else
         {
            this.log( "error","addChild(): child not instance of jstkHTMLElement" )
         }
         return this;
      }
      log( level, msg )
      {
         console[level]( this.toString() + " " + msg );
         return this;
      }
      toString()
      {
         return "[tkHTMLElement" + ( ( this.args ) ? " " + JSON.stringify( this.args ) + " " : "" ) + "]";
      }
   },

   htmlElementProperties:
   class {
      constructor( args )
      {
         if ( args )
         {
            for ( const e in args )
            {
               if ( this.has( e ) )
               {
                  console.error("tkHTMLArguments already has member " + e );
               }
               else
               {
                  this[e] = args[e];
               }
            }
         }
      }
      has( e )
      {
         return this[e] && ( typeof( this[e] ) != "string" || this[e] !== "" );
      }
   }
};