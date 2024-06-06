const cds = require('@sap/cds');

module.exports = async (srv) => {

    const sord = await cds.connect.to('API_SALES_ORDER_SRV');

    srv.on('READ', 'A_SalesOrder', async (req) => {
        const data = await sord.transaction(req).send({
            query: req.query,
            headers: {
                apikey: 'Dh3dJ34j6RddwyrwBrbfLuMupRYBDBnV'
            }
        });

        return data;
    });

    srv.on('getSalesOrderAmountBySoldToParty', async (req) => {
        const data = await sord.transaction(req).send({
            query: SELECT.from(sord.entities.A_SalesOrder).limit(1000),
            headers: {
                apikey: 'Dh3dJ34j6RddwyrwBrbfLuMupRYBDBnV'
            }
        });

        const salesOrderAmountBySoldToParty = data.reduce((acc, curr) => {
            if (acc[curr.SoldToParty]) {
                acc[curr.SoldToParty] = Number(Number(acc[curr.SoldToParty]) + curr.TotalNetAmount).toFixed(2);

                return acc;
            }

            acc[curr.SoldToParty] = curr.TotalNetAmount.toFixed(2);

            return acc;
        }, {});

        return salesOrderAmountBySoldToParty;
    })

}