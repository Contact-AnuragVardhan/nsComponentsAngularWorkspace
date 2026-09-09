
export class CommonUtil
{
    public static ALL_COUNTRIES = `
        query Countries {
        countries {
          code
          name
          native
          phone
          continent {
            name
            code
          }
          capital
          currency
          languages {
             code
             name
             native
             rtl
          }
          emoji
          emojiU
          states {
              code
              name
          }
          
        }
      }
    `;
    
    public static COUNTRIES_URL = "https://countries.trevorblades.com";
    
    public normalize(string: string) 
    {
        return string.replace(/[\s,]+/g, ' ').trim();
    }
}

export const isUndefinedOrNull = (val: unknown): boolean => {
  return (val === undefined ||  val === null);
};

/*export const removeGrid = (gridRef: any, con: HTMLDivElement | Document = document) => {
  if(gridRef.current) {
    const grid: NSGridReact = gridRef.current;
    grid.componentWillUnmount();
    const gridCon = con.querySelector(".nsDataGridContainer");
    if(gridCon) {
      gridCon.parentElement?.removeChild(gridCon);
    }
  }
};*/