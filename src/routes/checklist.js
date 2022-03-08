const express = require('express');
const res = require('express/lib/response');
const checklist = require('../models/checklist');

const router = express.Router();


const Checklist = require('../models/checklist')

router.get('/', async (req, res) => {
    try{
        let checklists = await Checklist.find({});
        res.status(200).render('checklists/index', { checklists: checklists })
    } catch (e) {
        res.status(422).render('pages/error', {error: 'Erro ao renderizar'});
    }
});

router.post('/', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({name});
    
    try{
    await checklist.save({ name })
    res.redirect('/checklists')
    }catch(err){
        console.log(err)
        res.status(422).render('checklist/new', { checklist: {...checklist, err}})
    }
});

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist ();
        res.status(200).render('checklists/new', { checklist: checklist});     
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao carregar o formulario'})
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', { checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir a edição de lista de tarefas'})
    }
})

router.get('/:id', async (req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/show', { checklist: checklist });
    } catch (e) {
        res.status(500).render('pages/error', {error: 'Erro ao renderizar as listas de tarefas'});
    }

});

router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id);

    try {
        checklist = await checklist.update({name});
        res.redirect('/checklists');
    } catch (error) {
        let errors = error.errors;
        res.status(422).render('checklists/edit', { checklist: {...checklist, errors}})
}});

router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndDelete(req.params.id)
        res.redirect('/checklists')
    } catch (error) {
        res.status(422).render('checklists/error', { erro: 'Erro ao tentar deletar a lista de taréfas'})
    }
})

module.exports = router;