using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Inclusion.Models;

namespace Inclusion.Controllers
{
    public class EquipamentoController : Controller
    {
        private readonly DataBaseContext _context;

        public EquipamentoController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: Equipamento
        public async Task<IActionResult> Index()
        {
            var dataBaseContext = _context.Equipamentos.Include(e => e.doador);
            return View(await dataBaseContext.ToListAsync());
        }

        // GET: Equipamento/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var equipamento = await _context.Equipamentos
                .Include(e => e.doador)
                .FirstOrDefaultAsync(m => m.id == id);
            if (equipamento == null)
            {
                return NotFound();
            }

            return View(equipamento);
        }

        // GET: Equipamento/Create
        public IActionResult Create()
        {
            ViewData["doadorId"] = new SelectList(_context.Doadores, "id", "email");
            return View();
        }

        // POST: Equipamento/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id,nomeEquipamento,descricao,imgUrl,doadorId")] Equipamento equipamento)
        {
            if (ModelState.IsValid)
            {
                _context.Add(equipamento);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["doadorId"] = new SelectList(_context.Doadores, "id", "email", equipamento.doadorId);
            return View(equipamento);
        }

        // GET: Equipamento/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var equipamento = await _context.Equipamentos.FindAsync(id);
            if (equipamento == null)
            {
                return NotFound();
            }
            ViewData["doadorId"] = new SelectList(_context.Doadores, "id", "email", equipamento.doadorId);
            return View(equipamento);
        }

        // POST: Equipamento/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id,nomeEquipamento,descricao,imgUrl,doadorId")] Equipamento equipamento)
        {
            if (id != equipamento.id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(equipamento);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EquipamentoExists(equipamento.id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["doadorId"] = new SelectList(_context.Doadores, "id", "email", equipamento.doadorId);
            return View(equipamento);
        }

        // GET: Equipamento/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var equipamento = await _context.Equipamentos
                .Include(e => e.doador)
                .FirstOrDefaultAsync(m => m.id == id);
            if (equipamento == null)
            {
                return NotFound();
            }

            return View(equipamento);
        }

        // POST: Equipamento/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var equipamento = await _context.Equipamentos.FindAsync(id);
            _context.Equipamentos.Remove(equipamento);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool EquipamentoExists(int id)
        {
            return _context.Equipamentos.Any(e => e.id == id);
        }
    }
}
